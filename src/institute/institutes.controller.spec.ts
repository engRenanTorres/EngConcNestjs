import { InstitutesController } from './institutes.controller';
import { InstitutesService } from './institutes.service';
import { Institute } from './models/institute.model';

describe('InstitutesController', () => {
  let service: InstitutesService;
  let controller: InstitutesController;
  let normalInstitute: Institute;

  beforeEach(async () => {
    service = new InstitutesService();
    controller = new InstitutesController(service);
    normalInstitute = {
      _id: 'xpto',
      name: 'Usuario Teste',
      about: 'usuario@teste.com',
      website: 'S3nh@Dificil',
    } as Institute;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of institutes', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve([normalInstitute]));

      expect(await controller.findAll()).toBe(normalInstitute);
    });
  });

  describe('findById', () => {
    it('should return a institute', async () => {
      jest
        .spyOn(service, 'findById')
        .mockImplementation(() => Promise.resolve(normalInstitute));

      expect(await controller.findById(normalInstitute.id)).toBe(
        normalInstitute,
      );
    });
  });
  /*describe('create', () => {
    it('should return a institute', async () => {
      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(normalInstitute));

      expect(await controller.create(normalInstitute)).toBe(normalInstitute);
    });
  });*/
  describe('update', () => {
    it('should return a institute', async () => {
      jest
        .spyOn(service, 'update')
        .mockImplementation(() => Promise.resolve(normalInstitute));

      expect(await controller.update(normalInstitute.id, normalInstitute)).toBe(
        normalInstitute,
      );
    });
  });
});
