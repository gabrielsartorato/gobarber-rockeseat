import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotEmailService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotEmailService = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotEmailService.execute({
      email,
    });

    return response.status(204).json();
  }
}
