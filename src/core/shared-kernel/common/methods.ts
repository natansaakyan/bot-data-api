import * as fs from 'fs';
import * as csvParser from 'csv-parser';

export const getEnvOrDefault = (varName: string, defaultValue?: any) =>
  varName in process.env ? process.env[varName] : defaultValue ? defaultValue : undefined;

export const convertCSVToJson = (csvFilePath: string, delimiter = ''): Promise<any[]> => {
  const jsonArray: any[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csvParser({ separator: delimiter }))
      .on('data', (data) => jsonArray.push(data))
      .on('end', () => {
        resolve(jsonArray);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};
