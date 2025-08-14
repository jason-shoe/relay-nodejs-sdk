import { ChatInterfaceClient } from "./chat-interface/ChatInterfaceClient";
import { DeliveryZoneClient } from "./delivery-zone/DeliveryZoneClient";
import { OrderClient } from "./order/OrderClient";
import { QuoteClient } from "./quote/QuoteClient";

export class RelayClient {
  public get order() {
    return new OrderClient();
  }

  public get deliveryZone() {
    return new DeliveryZoneClient();
  }

  public get chatInterface() {
    return new ChatInterfaceClient();
  }

  public get quote() {
    return new QuoteClient();
  }
}
