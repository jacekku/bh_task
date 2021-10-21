export default class EventsApiService {
  static readonly BASE_URL = process.env.BACKEND_URL + "/events";
  static readonly GET_URL = this.BASE_URL + "/find/@searchQuery";
  static readonly ALL_URL = this.BASE_URL + "/all";
  static readonly CREATE_URL = this.BASE_URL + "/create";

  static async getAll() {
    console.log(process.env.BACKEND_URL);
    return fetch(EventsApiService.ALL_URL);
  }

  static createEvent(event: any) {
    return fetch(EventsApiService.CREATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
  }

  static queryString(query: string) {
    let url = this.GET_URL.replace("@searchQuery", query);
    if (query == "") {
      url = this.ALL_URL;
    }
    return fetch(url);
  }
}
