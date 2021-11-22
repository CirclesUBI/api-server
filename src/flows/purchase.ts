import {assign, createMachine} from "xstate";

export type PurchaseContext = {
  processId: string;
  offerId: string;
};

export type PurchaseEvents = {
  type: "GOT_PREVIOUS_PAYOUT",
  lastPayoutAt: Date
} | {
  type: "NO_PREVIOUS_PAYOUT",
}
/*
export const purchaseMachine = createMachine<PurchaseContext, PurchaseEvents>({
  initial: "waitFor60Seconds",
  context: {
    nextUbiAt: null
  },
  states: {
    waitFor60Seconds: {
      after: {
        60000: "checkLastPayout"
      }
    },
    checkLastPayout: {
      invoke: {
        src: "getLastUbiRetrievalDate"
      },
      on: {
        GOT_PREVIOUS_PAYOUT: [{
          cond: "previousPayoutIsNewerThan24Hours",
          actions: "calculateAndAssignNextUbiAt",
          target: "waitForNextUbiAt"
        },{
          cond: "previousPayoutIsOlderThan24Hours",
          target: "getUbi"
        }],
        NO_PREVIOUS_PAYOUT: "getUbi"
      }
    },
    waitForNextUbiAt: {
      after: {
        NEXT_UBI_DELAY: "getUbi"
      }
    },
    getUbi: {
      entry: "clearContext",
      invoke: {
        src: "getUbi",
        onDone: "waitFor60Seconds",
        onError: "waitFor60Seconds"
      }
    }
  }
}, {
  guards: {
    previousPayoutIsNewerThan24Hours: (ctx, event: {type: "GOT_PREVIOUS_PAYOUT", lastPayoutAt:Date}) => Date.now() < event.lastPayoutAt.getTime() + (24 * 60 * 60 * 1000),
    previousPayoutIsOlderThan24Hours: (ctx, event: {type: "GOT_PREVIOUS_PAYOUT", lastPayoutAt:Date}) => Date.now() >= event.lastPayoutAt.getTime() + (24 * 60 * 60 * 1000)
  },
  delays: {
    NEXT_UBI_DELAY: (context, event) => context.nextUbiAt - Date.now()
  },
  services: {
    getUbi: async () => {
      let $me: Profile|null = null;
      const unsub = me.subscribe(o => {
        $me = o;
      });
      unsub();
      if (!$me)
        throw new Error(`Couldn't load your profile`);

      const privateKey = sessionStorage.getItem("circlesKey");
      if (!privateKey)
        throw new Error(`Your private key is locked.`)

      const gnosisSafeProxy = new GnosisSafeProxy(RpcGateway.get(), $me.circlesAddress);
      const circlesAccount = new CirclesAccount($me.circlesAddress);
      const result = await circlesAccount.getUBI(privateKey, gnosisSafeProxy);
      return await result.toPromise();
    },
    getLastUbiRetrievalDate: () => async (callback) => {
      const apiClient = await window.o.apiClient.client.subscribeToResult();
      const result = await apiClient.query({
        query: ubiInfoDocument
      });
      if ((result.errors && result.errors.length) || !result.data.ubiInfo) {
        callback({
          type: "NO_PREVIOUS_PAYOUT"
        });
      } else {
        callback({
          type: "GOT_PREVIOUS_PAYOUT",
          lastPayoutAt: new Date(Date.parse(result.data.ubiInfo))
        });
      }
    }
  },
  actions: {
    clearContext: assign({
      nextUbiAt: null
    }),
    calculateAndAssignNextUbiAt: assign({
      nextUbiAt: (ctx, event:UbiEvents) => event.type === "GOT_PREVIOUS_PAYOUT"
        ? event.lastPayoutAt.getTime() + (24 * 60 * 60 * 1000)
        : null
    })
  }
});*/