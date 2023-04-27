import { Invoice } from "../../domain/models/invoice";
import { InvoiceRepository } from "../../domain/repositories/invoice.repository";
import { Logger } from "../../domain/models/logger";
import { InvoiceModel } from "../../infrastructure/models/invoice.model";

export class InvoiceRepositoryImpl extends InvoiceRepository {

  constructor(logger: Logger) {
    super(logger);
    logger.info('Init InvoiceRepository');
  }

  async save(data: Invoice): Promise<Invoice> {
    const model = new InvoiceModel({
      ...data
    });
    return await model.save();
  }
  find(): Promise<Invoice[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Invoice | null> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: Invoice): Promise<Invoice> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      InvoiceModel.findByIdAndDelete(id)
        .then(() => {
          resolve();
        })
        .catch(e => {
          reject(e);
        })
    });
  }
}