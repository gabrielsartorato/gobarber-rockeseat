import FakeApponintmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let listProvidersDayAvilability: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeApponintmentsRepository;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeApponintmentsRepository();
    listProvidersDayAvilability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 9, 9, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 9, 9, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 9, 11).getTime();
    });

    const availability = await listProvidersDayAvilability.execute({
      provider_id: 'user',
      year: 2020,
      month: 10,
      day: 9,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
