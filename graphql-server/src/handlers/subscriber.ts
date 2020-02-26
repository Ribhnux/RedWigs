import { DocumentNode } from "graphql";
import gql from "graphql-tag";
import {
  redwigsClient,
  // REDWIGS_REDIS_UNSUBSCRIBE_ALL,
  redwigsSubscriber
} from "@adapters/redwigs";
import { EventEmitter } from "events";
import { ConnectionContext } from "subscriptions-transport-ws";
import WebSocket from "ws";

const ev = new EventEmitter();
redwigsSubscriber.on("message", (channel: string, message: string) => {});

// const getChannelsNameFromDocumentNode = (document: DocumentNode): string[] => {
//   const [definition] = document.definitions;
//   const {
//     //@ts-ignore
//     selectionSet: {
//       selections: [selection]
//     }
//   } = definition;

//   const {
//     arguments: [argument]
//   } = selection;

//   const {
//     value: { values: channels }
//   } = argument;

//   return channels.map(data => data.value);
// };

// const getChannelNameFromWebSocketMessage = (
//   message: string
// ): string[] | undefined => {
//   try {
//     const message_ = JSON.parse(message);
//     if (!message_.payload) return;
//     const document = gql`
//       ${message_.payload.query}
//     ` as DocumentNode;
//     const channelName = getChannelsNameFromDocumentNode(document);
//     return channelName;
//   } catch (err) {
//     return;
//   }
// };

const COMPLETE_MESSAGE = {
  type: "complete",
  id: 1
};

const onUnsubscribeHandler = (webSocket: WebSocket) => (
  channel: string,
  message: any
) => {
  // try {
  //   console.log(channel);
  //   webSocket.send(JSON.stringify(COMPLETE_MESSAGE));
  //   redwigsSubscriber.unsubscribe(
  //     [REDWIGS_REDIS_UNSUBSCRIBE_ALL, channel].join(":")
  //   );
  // } catch (err) {
  //   throw new Error(err);
  // }
};

// const onWebsocketMessage = (message: string) => {
//   try {
//     const channels: string[] = getChannelNameFromWebSocketMessage(message);
//     if (!channels) return;
//     const unsubscribeWatcherChannelName = channels.map(channel =>
//       [REDWIGS_REDIS_UNSUBSCRIBE_ALL, channel].join(":")
//     );

//     redwigsSubscriber.subscribe(...unsubscribeWatcherChannelName);
//   } catch (err) {
//     throw new Error(err);
//   }
// };

export const onSubscriptionConnect = (
  connectionParams: object,
  websocket: WebSocket,
  context: ConnectionContext
): any => {};

export const onSubscriptionDisconnect = (webSocket, context) => {
  // console.log("disconnect");
  // onWebsocketMessage(webSocket);
};
