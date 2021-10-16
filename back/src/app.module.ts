import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';

@Module({
  imports: [EventsModule, MongooseModule.forRoot('mongodb://localhost/task')],
})
export class AppModule {}
