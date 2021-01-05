import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayhAvailabilityService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;

    const listProviderDayhAvailability = container.resolve(
      ListProviderDayhAvailabilityService,
    );

    const appointments = await listProviderDayhAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(appointments));
  }
}
