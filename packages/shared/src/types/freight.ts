// ============================================================
// Freight Forwarding & Customs Types
// ============================================================

import type { Address, BaseEntity, ContactInfo, Money } from './common';
import type { TransportMode } from './shipment';

export enum FreightBookingStatus {
  INQUIRY = 'inquiry',
  QUOTED = 'quoted',
  CONFIRMED = 'confirmed',
  DOCUMENTATION = 'documentation',
  CARGO_READY = 'cargo_ready',
  IN_TRANSIT = 'in_transit',
  AT_PORT = 'at_port',
  CUSTOMS_CLEARANCE = 'customs_clearance',
  CLEARED = 'cleared',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum CustomsDeclarationStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  ASSESSMENT = 'assessment',
  DUTY_PAID = 'duty_paid',
  EXAMINED = 'examined',
  RELEASED = 'released',
  HELD = 'held',
  REJECTED = 'rejected',
}

export enum IncotermsType {
  EXW = 'EXW',
  FCA = 'FCA',
  FAS = 'FAS',
  FOB = 'FOB',
  CFR = 'CFR',
  CIF = 'CIF',
  CPT = 'CPT',
  CIP = 'CIP',
  DAP = 'DAP',
  DPU = 'DPU',
  DDP = 'DDP',
}

export enum DocumentType {
  BILL_OF_LADING = 'bill_of_lading',
  AIRWAY_BILL = 'airway_bill',
  COMMERCIAL_INVOICE = 'commercial_invoice',
  PACKING_LIST = 'packing_list',
  CERTIFICATE_OF_ORIGIN = 'certificate_of_origin',
  CUSTOMS_DECLARATION = 'customs_declaration',
  IMPORT_PERMIT = 'import_permit',
  INSURANCE_CERTIFICATE = 'insurance_certificate',
  PHYTOSANITARY_CERTIFICATE = 'phytosanitary_certificate',
  FUMIGATION_CERTIFICATE = 'fumigation_certificate',
  PROOF_OF_DELIVERY = 'proof_of_delivery',
  DELIVERY_RECEIPT = 'delivery_receipt',
  WAREHOUSE_RECEIPT = 'warehouse_receipt',
  PEZA_IMPORT_PERMIT = 'peza_import_permit',
}

export interface FreightBooking extends BaseEntity {
  readonly bookingNumber: string;
  readonly status: FreightBookingStatus;
  readonly mode: TransportMode;
  readonly incoterms: IncotermsType;
  readonly shipper: ContactInfo;
  readonly consignee: ContactInfo;
  readonly notifyParty?: ContactInfo;
  readonly origin: Address;
  readonly destination: Address;
  readonly portOfLoading?: string;
  readonly portOfDischarge?: string;
  readonly vesselName?: string;
  readonly voyageNumber?: string;
  readonly etd?: Date;
  readonly eta?: Date;
  readonly containerCount?: number;
  readonly containerType?: string;
  readonly grossWeightKg: number;
  readonly volumeCbm: number;
  readonly commodity: string;
  readonly hsCode?: string;
  readonly freightCharges?: Money;
  readonly customsBrokerId?: string;
  readonly customsDeclarationId?: string;
}

export interface CustomsDeclaration extends BaseEntity {
  readonly declarationNumber: string;
  readonly bookingId: string;
  readonly status: CustomsDeclarationStatus;
  readonly entryType: 'import' | 'export' | 'transit';
  readonly declarantName: string;
  readonly importerTin?: string;
  readonly importerAccreditationNumber?: string;
  readonly hsCode: string;
  readonly commodityDescription: string;
  readonly originCountry: string;
  readonly grossWeightKg: number;
  readonly declaredValue: Money;
  readonly dutiableValue?: Money;
  readonly customsDuty?: Money;
  readonly vat?: Money;
  readonly otherCharges?: Money;
  readonly totalAssessment?: Money;
  readonly bocReferenceNumber?: string;
  readonly e2mTransactionNumber?: string;
  readonly pezaImportPermitNumber?: string;
  readonly releaseDate?: Date;
  readonly examinerName?: string;
  readonly examinerRemarks?: string;
}

export interface FreightDocument extends BaseEntity {
  readonly bookingId?: string;
  readonly shipmentId?: string;
  readonly type: DocumentType;
  readonly documentNumber?: string;
  readonly fileName: string;
  readonly fileUrl: string;
  readonly fileSizeBytes: number;
  readonly mimeType: string;
  readonly isVerified: boolean;
  readonly verifiedByUserId?: string;
  readonly verifiedAt?: Date;
  readonly expirationDate?: Date;
  readonly extractedData?: Record<string, unknown>;
  readonly aiConfidenceScore?: number;
}
