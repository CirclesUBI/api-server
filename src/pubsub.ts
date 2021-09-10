import { PubSub } from 'graphql-subscriptions';

export class ApiPubSub
{
  public get pubSub () {
    return this._pubsub;
  }
  private readonly _pubsub = new PubSub();
  private static _instance:ApiPubSub;

  private constructor() {
  }

  public static get instance() : ApiPubSub {
    if (this._instance == null)
      this._instance = new ApiPubSub();

    return this._instance;
  }
}