import { Invoice } from '../../domain/models/invoice';
import { InvoiceRepository } from '../../domain/repositories/invoice.repository';
import { Logger } from '../../domain/models/logger';
import { InvoiceModel } from '../../infrastructure/models/invoice.model';
import { InvoiceFilter } from '../../infrastructure/interfaces/invoice-filter';
import { RedisClient } from '../adapters/redis';

export class InvoiceRepositoryImpl extends InvoiceRepository {

  redisClient: RedisClient;

  constructor(logger: Logger) {
    super(logger);
    this.redisClient = new RedisClient(this.logger);
    logger.info('Init InvoiceRepository');
  }

  async save(data: Invoice): Promise<Invoice> {
    const model = new InvoiceModel({
      ...data,
    });
    return await model.save();
  }

  buildFilters(filters: InvoiceFilter) {
    const mongoFilters = [];
    if (filters.id) mongoFilters.push({ _id: filters.id });
    if (filters.number) mongoFilters.push({ number: filters.number });
    if (filters.paid !== undefined) mongoFilters.push({ paid: filters.paid });
    if (filters.total !== undefined) mongoFilters.push({ total: filters.total });
    if (filters.total_iva !== undefined) mongoFilters.push({ total_iva: filters.total_iva });
    if (filters.item_amount !== undefined) mongoFilters.push({ 'items.amount': filters.item_amount });
    if (filters.item_base_value !== undefined) mongoFilters.push({ 'items.baseValue': filters.item_base_value });
    if (filters.item_description) mongoFilters.push({ 'items.description': filters.item_description });
    if (filters.item_iva !== undefined) mongoFilters.push({ 'items.iva': filters.item_iva });
    if (filters.item_total !== undefined) mongoFilters.push({ 'items.total': filters.item_total });

    if (!mongoFilters.length) {
      return {};
    }
    return {
      $or: mongoFilters,
    };
  }

  find(filters: InvoiceFilter): Promise<Invoice[]> {
    return InvoiceModel.find(this.buildFilters(filters)).exec();
  }

  async findById(id: string): Promise<Invoice | null> {
    const result = await this.redisClient.get<Invoice>(`/invoice/${id}`);
    if (result) {
      this.logger.info('return from redis');
      return result;
    }
    const resultDB = await InvoiceModel.findById(id).exec();
    await this.redisClient.set(`/invoice/${id}`, resultDB);
    return resultDB;
  }

  update(id: string, data: Invoice): Promise<Invoice | null> {
    return new Promise((resolve, reject) => {
      InvoiceModel.findByIdAndUpdate(id, data, { new: true })
        .then((result) => {
          if (result) {
            const invoice = result.toJSON();
            resolve(invoice);
          }
          resolve(null);
        })
        .catch((error) => reject(error));
    });
  }

  delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      InvoiceModel.findByIdAndDelete(id)
        .then(() => {
          resolve();
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}
