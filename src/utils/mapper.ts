export function mapFields(
  data: Record<string, any>,
  fieldMap: Record<string, string>
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in fieldMap) {
    result[fieldMap[key]] = data[key];
  }

  return result;
}

export const febLocationFieldMap = {
Testing__Hub_name__CST:"name",
  Testing__Address__CST: "address",
  Testing__Latitude__CST: "latitude",
  Testing__Longitude__CST: "longitude",
  Testing__Power__CST: "power",
  Testing__Price__CST:"price",
  Testing__Status__CST: "status",
  Testing__total_slots__CST: "total_slots",
  Testing__available_slots__CST:"available_slots",
  Testing__HasWifi__CST: "wifi",
  id:"id"
};


