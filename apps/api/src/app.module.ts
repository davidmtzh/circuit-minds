import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { CoursesController } from './courses/courses.controller';
import { SessionsController } from './sessions/sessions.controller';
import { EnrollmentsController } from './enrollments/enrollments.controller';
import { StudentsController } from './students/students.controller';
import { AdminAuthService } from './auth/admin-auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
  ],
  controllers: [AppController, CoursesController, SessionsController, EnrollmentsController,StudentsController,],
  providers: [AdminAuthService, AppService],
})
export class AppModule {}
