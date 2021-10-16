import { Injectable } from '@nestjs/common';
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
    return createdEvent.save();
  }

  getForEmail(email: any): Promise<Event[]> {
    return this.eventModel.find({ email }).exec();
  }
}
