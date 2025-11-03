import type { AxiosInstance } from "axios";

export async function logOffer(client: AxiosInstance) {
  const offersData = await client.post<OffersData>("/api/search/offers", {
    search: null,
    filters: {},
    pageSize: 2147483647,
    page: 0,
    orderDirection: "desc",
    orderBy: "created",
  });

  offersData.data.results.forEach((offer) =>
    console.log(`Offer ID: ${offer.id}, Address: ${offer.residenceAddress}`)
  );
}

export interface OffersData {
  facets: any; // Replace `any` with a more specific type if available
  totalResults: number;
  page: number;
  pageSize: number;
  results: Offer[];
}

export interface Offer {
  id: string;
  created: string;
  updated: string;
  number: number;
  offerText: string;
  showingText: string;
  internalNote: string | null;
  deadline: string;
  recipients: Array<any>; // Replace `any` with a more specific type if available
  followUp: string | null;
  recipientsCount: number;
  winnerId: string | null;
  state: string;
  organizationId: string;
  organization: string;
  companyId: string;
  company: string;
  residenceId: string;
  propertyId: string;
  propertyAdministratorId: string;
  residenceNumber: number;
  residenceShortId: number;
  residenceAddress: string;
  residencePostalCode: number;
  responsibleUserId: string;
  availableFrom: string;
  responsibleUser: string;
  hasUnreadMessages: boolean;
  unreadMessagesCount: number;
  onlyForStudents: boolean;
  companyPropertyResidenceNumbersId: string;
}

export interface Recipient {
  created: string;
  updated: string;
  accepted: string | null;
  declined: string | null;
  received: string | null;
  offerId: string;
  userId: string;
  state: string;
  internalState: string | null;
  note: string | null;
  followupDate: string | null;
  invitationExpiredDate: string | null;
  residenceApplicationStatus: string | null;
}
