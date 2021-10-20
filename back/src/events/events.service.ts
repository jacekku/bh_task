import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './model/event.dto.model';
import { Event, EventDocument } from './model/event.schema';

@Injectable()
export default class EventsService {
  
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    this.validateEvent(createdEvent);
    return createdEvent.save();
  }

  async getAll() {
    return await this.eventModel.find()
  }

  async getForQueryString(queryString: string): Promise<Event[]> {
    return this.eventModel.find({ 
      "$or": [
        {email: queryString},
        {firstName: queryString},
        {lastName: queryString},
        {eventName: queryString}
      ]
     }).exec();
  }

  private validateEvent(createdEvent: Event) {
    if (
      this.validateFirstName(createdEvent) ||
      this.validateLastName(createdEvent) ||
      this.validateEmail(createdEvent) ||
      this.validateDate(createdEvent)
    ) {
      throw new BadRequestException('');
    }
  }

  private validateFirstName(event: Event) {
    const { firstName } = event;
    return !firstName;
  }
  private validateLastName(event: Event) {
    const { lastName } = event;
    return !lastName;
  }
  private validateEmail(event: Event) {
    const { email } = event;
    return !email;
  }
  private validateDate(event: Event) {
    const { date } = event;
    return !date;
  }
}
