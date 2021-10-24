import { Event } from '../model/event.schema';
import EventsController from '../events.controller';
import EventsService from '../events.service';
import { FilterQuery } from 'mongoose';

describe('EventsController', () => {
  let MOCK_DB: Event[] = [];

  let eventsController: EventsController;
  let eventsService: EventsService;
  const mockEvent: Event = {
    date: new Date(),
    email: 'email@email.com',
    firstName: 'firstName',
    lastName: 'lastName',
    eventName: '',
  };
  beforeAll(async () => {
    class mockEventsModel {
      firstName: string;
      lastName: string;
      email: string;
      date: Date;
      eventName: string;
      constructor(public data?: Event) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.date = data.date;
        this.eventName = data.eventName;
      }
      save = () => {
        return MOCK_DB.push(this.data);
      };
      static find = (query: FilterQuery<Event>) => {
        if (!query) return MOCK_DB;

        return {
          exec: () => {
            return MOCK_DB.find((event: Event) => {
              return query.$or.filter((field: FilterQuery<Event>) => {
                return (
                  field.date === event.date ||
                  field.email === event.email ||
                  field.eventName === event.eventName ||
                  field.firstName === event.firstName ||
                  field.lastName === event.lastName
                );
              }).length;
            });
          },
        };
      };
    }
    eventsService = new EventsService(mockEventsModel as any);
    eventsController = new EventsController(eventsService);
  });

  beforeEach(() => {
    MOCK_DB = [];
  });

  it('should insert a doc into collection', async () => {
    await eventsController.createEvent(mockEvent);

    const insertedEvent = await eventsController.getAllForQueryString(
      'email@email.com',
    );
    expect(insertedEvent).toEqual(mockEvent);
  });
  it('should return all documents', async () => {
    await eventsController.createEvent(mockEvent);
    await eventsController.createEvent(mockEvent);

    const allEvents = await eventsController.getAll();
    expect(allEvents).toHaveLength(2);
  });
});
