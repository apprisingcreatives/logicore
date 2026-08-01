// ============================================================
// Philippine Compliance Business Rules
// ============================================================

import { Result } from '../common/result';
import type { Money } from '@logicore/shared';
import {
  PH_VAT_RATE,
  CUSTOMS_DE_MINIMIS_PHP,
  DTI_FTEB_CAPITAL_REQUIREMENTS,
} from '@logicore/shared';

/**
 * BOC Customs Duty Calculation
 * Calculates total assessment for imported goods.
 */
export function calculateCustomsAssessment(params: {
  declaredValuePhp: number;
  dutyRate: number;
  isExemptFromDuty?: boolean;
  isPezaImport?: boolean;
}): {
  dutiableValue: number;
  customsDuty: number;
  vat: number;
  totalAssessment: number;
} {
  const { declaredValuePhp, dutyRate, isExemptFromDuty, isPezaImport } = params;

  // De minimis exemption
  if (declaredValuePhp <= CUSTOMS_DE_MINIMIS_PHP) {
    return {
      dutiableValue: declaredValuePhp,
      customsDuty: 0,
      vat: 0,
      totalAssessment: 0,
    };
  }

  // PEZA imports are generally duty-free and VAT-exempt
  if (isPezaImport) {
    return {
      dutiableValue: declaredValuePhp,
      customsDuty: 0,
      vat: 0,
      totalAssessment: 0,
    };
  }

  const customsDuty = isExemptFromDuty ? 0 : declaredValuePhp * dutyRate;
  const vatBase = declaredValuePhp + customsDuty;
  const vat = vatBase * PH_VAT_RATE;
  const totalAssessment = customsDuty + vat;

  return {
    dutiableValue: declaredValuePhp,
    customsDuty: Math.round(customsDuty * 100) / 100,
    vat: Math.round(vat * 100) / 100,
    totalAssessment: Math.round(totalAssessment * 100) / 100,
  };
}

/**
 * Validate DTI-FTEB capitalization requirements for freight forwarders
 */
export function validateDtiCapitalization(
  category: keyof typeof DTI_FTEB_CAPITAL_REQUIREMENTS,
  paidUpCapitalPhp: number,
): Result<void> {
  const requirement = DTI_FTEB_CAPITAL_REQUIREMENTS[category];
  if (paidUpCapitalPhp < requirement.minCapitalPhp) {
    return Result.fail(
      `${requirement.label} requires minimum paid-up capital of ₱${requirement.minCapitalPhp.toLocaleString()}. ` +
      `Current: ₱${paidUpCapitalPhp.toLocaleString()}.`,
    );
  }
  return Result.ok(undefined);
}

/**
 * BOC E2M accreditation validation
 * Checks if required accreditation documents are present
 */
export function validateBocAccreditation(params: {
  hasActiveAccreditation: boolean;
  accreditationExpiry?: Date;
  importerTin?: string;
}): Result<void> {
  if (!params.hasActiveAccreditation) {
    return Result.fail(
      'BOC accreditation is required for customs processing. ' +
      'Register at the Bureau of Customs E2M system.',
    );
  }

  if (params.accreditationExpiry && params.accreditationExpiry < new Date()) {
    return Result.fail(
      'BOC accreditation has expired. Please renew your accreditation.',
    );
  }

  if (!params.importerTin) {
    return Result.fail(
      'Importer TIN is required for customs declaration submission.',
    );
  }

  return Result.ok(undefined);
}

/**
 * Required documents checklist for customs clearance
 */
export function getRequiredCustomsDocuments(params: {
  isImport: boolean;
  isExport: boolean;
  isPezaImport: boolean;
  isFoodProduct: boolean;
  isAgricultural: boolean;
}): string[] {
  const docs: string[] = [];

  if (params.isImport) {
    docs.push(
      'Commercial Invoice',
      'Packing List',
      'Bill of Lading / Airway Bill',
      'Import Entry Declaration',
    );

    if (params.isPezaImport) {
      docs.push('PEZA Import Permit');
    }

    if (params.isFoodProduct) {
      docs.push('FDA Certificate of Product Registration');
    }

    if (params.isAgricultural) {
      docs.push(
        'Phytosanitary Certificate',
        'Bureau of Plant Industry Clearance',
      );
    }
  }

  if (params.isExport) {
    docs.push(
      'Commercial Invoice',
      'Packing List',
      'Bill of Lading / Airway Bill',
      'Export Declaration',
      'Certificate of Origin',
    );
  }

  return docs;
}
