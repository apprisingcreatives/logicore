// ============================================================
// Philippine Compliance Constants
// ============================================================

/** BOC (Bureau of Customs) accreditation types */
export enum BocAccreditationType {
  IMPORTER = 'importer',
  CUSTOMS_BROKER = 'customs_broker',
  FREIGHT_FORWARDER = 'freight_forwarder',
  ECOMMERCE_PLATFORM = 'ecommerce_platform',
}

/** DTI-FTEB sea freight forwarder categories & capital requirements */
export const DTI_FTEB_CAPITAL_REQUIREMENTS = {
  NVOCC: { label: 'Non-Vessel Operating Common Carrier', minCapitalPhp: 5_000_000 },
  IFF: { label: 'International Freight Forwarder', minCapitalPhp: 3_000_000 },
  DFF: { label: 'Domestic Freight Forwarder', minCapitalPhp: 1_000_000 },
} as const;

/** PEZA ecozone types */
export enum PezaZoneType {
  MANUFACTURING = 'manufacturing',
  IT_PARK = 'it_park',
  AGRO_INDUSTRIAL = 'agro_industrial',
  TOURISM = 'tourism',
  MEDICAL_TOURISM = 'medical_tourism',
}

/** Philippine VAT rate */
export const PH_VAT_RATE = 0.12;

/** Philippine customs duty — simplified common rates */
export const COMMON_CUSTOMS_DUTY_RATES: Record<string, number> = {
  '0': 0.0,
  '1': 0.01,
  '3': 0.03,
  '5': 0.05,
  '7': 0.07,
  '10': 0.1,
  '15': 0.15,
  '20': 0.2,
  '30': 0.3,
};

/** De minimis threshold — imports below this value are duty-free */
export const CUSTOMS_DE_MINIMIS_PHP = 10_000;
