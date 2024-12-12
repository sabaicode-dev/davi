export interface DeviceInfo {
  my_os: string;
  my_pub_ip: string;
  deviceDetails: object;
  os: string;
  browser: string;
  userAgent: string;
  currentDateTime: string;
  location: Location;
  googleMapsLink: string;
  get_network_org: string;
}

export interface Location {
  region: string;
  capital: string;
  country: string;
}
