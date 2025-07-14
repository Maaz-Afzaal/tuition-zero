import { Injectable } from '@nestjs/common';
import { Repository, FindManyOptions, FindOneOptions, DeepPartial, UpdateResult, DeleteResult } from 'typeorm';

export interface BaseEntity {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

@Injectable()
export abstract class BaseService<T extends BaseEntity> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  /**
   * Find one record by condition
   */
  async findOne(options?: FindOneOptions<T>): Promise<T | null> {
    if (!options) {
      return null;
    }
    return this.repository.findOne(options);
  }

  /**
   * Find one record by id
   */
  async findOneById(id: number, options?: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne({
      ...options,
      where: { id } as any,
    });
  }

  /**
   * Find all records by condition
   */
  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  /**
   * Find and count all records
   */
  async findAndCount(options?: FindManyOptions<T>): Promise<[T[], number]> {
    return this.repository.findAndCount(options);
  }

  /**
   * Create a new record
   */
  async create(entityData: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(entityData);
    return this.repository.save(entity);
  }

  /**
   * Create multiple records
   */
  async createMany(entitiesData: DeepPartial<T>[]): Promise<T[]> {
    const entities = this.repository.create(entitiesData);
    return this.repository.save(entities);
  }

  /**
   * Update record(s) by condition
   */
  async update(criteria: any, partialEntity: DeepPartial<T>): Promise<UpdateResult> {
    return this.repository.update(criteria, partialEntity as any);
  }

  /**
   * Update one record by id
   */
  async updateById(id: number, partialEntity: DeepPartial<T>): Promise<UpdateResult> {
    return this.repository.update(id, partialEntity as any);
  }

  /**
   * Save an entity (create or update)
   */
  async save(entity: DeepPartial<T>): Promise<T> {
    return this.repository.save(entity);
  }

  /**
   * Delete record(s) by condition
   */
  async delete(criteria: any): Promise<DeleteResult> {
    return this.repository.delete(criteria);
  }

  /**
   * Delete one record by id
   */
  async deleteById(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  /**
   * Soft delete (if entity supports it)
   */
  async softDelete(criteria: any): Promise<UpdateResult> {
    return this.repository.softDelete(criteria);
  }

  /**
   * Soft delete by id
   */
  async softDeleteById(id: number): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }

  /**
   * Restore soft deleted records
   */
  async restore(criteria: any): Promise<UpdateResult> {
    return this.repository.restore(criteria);
  }

  /**
   * Count records by condition
   */
  async count(options?: FindManyOptions<T>): Promise<number> {
    return this.repository.count(options);
  }

  /**
   * Check if record exists
   */
  async exists(options: FindOneOptions<T>): Promise<boolean> {
    const count = await this.repository.count(options);
    return count > 0;
  }

  /**
   * Find records with pagination
   */
  async paginate(page: number = 1, limit: number = 10, options?: FindManyOptions<T>) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.repository.findAndCount({
      ...options,
      skip,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    };
  }

  /**
   * Execute raw query
   */
  async rawQuery(query: string, parameters?: any[]): Promise<any> {
    return this.repository.query(query, parameters);
  }

  /**
   * Get repository instance for advanced operations
   */
  getRepository(): Repository<T> {
    return this.repository;
  }
} 