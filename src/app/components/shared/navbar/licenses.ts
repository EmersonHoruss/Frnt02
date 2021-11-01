// Licenses are expresessed by set of modules
// Use class Licenses just as reference
export class Licenses {
  // module contain submodules
  _module = [];
}

export class LicensesData {
  _getLicenseData() {
    return {
      _ownerLicense: [],
      _sellerLicense: [],
      _debtCollectorLicense: [],
    };
  }
}
