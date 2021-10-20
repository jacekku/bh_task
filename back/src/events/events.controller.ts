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

  @Get('/find/:queryString')
  async getAllForQueryString(@Param('queryString') query): Promise<Event[]> {
    return await this.eventsService.getForQueryString(query);
  }

  @Get('/all')
  async getAll() {
    return await this.eventsService.getAll();
  }
}
