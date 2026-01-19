// lib/countries.ts
import { getCountries, getCountryCallingCode } from "libphonenumber-js";

export type CountryOption = {
  code: string; // ISO2: PK, US, etc.
  dial: string; // +92
};

export const COUNTRIES: CountryOption[] = getCountries().map((code) => ({
  code,
  dial: `+${getCountryCallingCode(code)}`,
}));
