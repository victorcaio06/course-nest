import { SupabaseClient, createClient } from '@supabase/supabase-js';

import { FileDTO } from 'src/modules/users/dto/user.dto';
import { IStorageRepository } from '../storage.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageSupabaseRepository implements IStorageRepository {
  private client: SupabaseClient;
  private supabaseUrl = process.env.SUPABASE_URL ?? '';
  private supabaseKey = process.env.SUPABASE_KEY ?? '';
  private supabaseBucket = process.env.SUPABASE_BUCKET ?? '';

  constructor() {
    this.client = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async upload(file: FileDTO, folder: string): Promise<any> {
    const data = await this.client.storage
      .from(this.supabaseBucket)
      .upload(`${folder}/` + file.originalName, file.buffer, {
        upsert: true,
      });

    return data;
  }
}
