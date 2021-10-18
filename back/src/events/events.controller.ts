import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import EventsService from './events.service';
import { CreateEventDto } from './model/event.dto.model';
import { Event } from './model/event.schema';

@Controller('events')
export default class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('/create')
  async createEvent(@Body() createEventDto: CreateEventDto) {
    await this.eventsService.createEvent(createEventDto);
  }

  @Get(':email')
  async getAllForEmail(@Param('email') email): Promise<Event[]> {
    return this.eventsService.getForEmail(email);
  }
}
