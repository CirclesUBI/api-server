export const EMPTY_DATA = '0x'
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const GNOSIS_SAFE_ABI = [
  {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "owner", "type": "address"}],
    "name": "AddedOwner",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "bytes32",
      "name": "approvedHash",
      "type": "bytes32"
    }, {"indexed": true, "internalType": "address", "name": "owner", "type": "address"}],
    "name": "ApproveHash",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "masterCopy", "type": "address"}],
    "name": "ChangedMasterCopy",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "uint256", "name": "threshold", "type": "uint256"}],
    "name": "ChangedThreshold",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "contract Module", "name": "module", "type": "address"}],
    "name": "DisabledModule",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "contract Module", "name": "module", "type": "address"}],
    "name": "EnabledModule",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "bytes32",
      "name": "txHash",
      "type": "bytes32"
    }, {"indexed": false, "internalType": "uint256", "name": "payment", "type": "uint256"}],
    "name": "ExecutionFailure",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "module", "type": "address"}],
    "name": "ExecutionFromModuleFailure",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "module", "type": "address"}],
    "name": "ExecutionFromModuleSuccess",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "bytes32",
      "name": "txHash",
      "type": "bytes32"
    }, {"indexed": false, "internalType": "uint256", "name": "payment", "type": "uint256"}],
    "name": "ExecutionSuccess",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "owner", "type": "address"}],
    "name": "RemovedOwner",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "bytes32", "name": "msgHash", "type": "bytes32"}],
    "name": "SignMsg",
    "type": "event"
  }, {"payable": true, "stateMutability": "payable", "type": "fallback"}, {
    "constant": true,
    "inputs": [],
    "name": "NAME",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "VERSION",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {
      "internalType": "uint256",
      "name": "_threshold",
      "type": "uint256"
    }],
    "name": "addOwnerWithThreshold",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{"internalType": "address", "name": "", "type": "address"}, {
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    }],
    "name": "approvedHashes",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"internalType": "address", "name": "_masterCopy", "type": "address"}],
    "name": "changeMasterCopy",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"internalType": "uint256", "name": "_threshold", "type": "uint256"}],
    "name": "changeThreshold",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "contract Module",
      "name": "prevModule",
      "type": "address"
    }, {"internalType": "contract Module", "name": "module", "type": "address"}],
    "name": "disableModule",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "domainSeparator",
    "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"internalType": "contract Module", "name": "module", "type": "address"}],
    "name": "enableModule",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"internalType": "address", "name": "to", "type": "address"}, {
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
    }, {"internalType": "bytes", "name": "data", "type": "bytes"}, {
      "internalType": "enum Enum.Operation",
      "name": "operation",
      "type": "uint8"
    }],
    "name": "execTransactionFromModule",
    "outputs": [{"internalType": "bool", "name": "success", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"internalType": "address", "name": "to", "type": "address"}, {
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
    }, {"internalType": "bytes", "name": "data", "type": "bytes"}, {
      "internalType": "enum Enum.Operation",
      "name": "operation",
      "type": "uint8"
    }],
    "name": "execTransactionFromModuleReturnData",
    "outputs": [{"internalType": "bool", "name": "success", "type": "bool"}, {
      "internalType": "bytes",
      "name": "returnData",
      "type": "bytes"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "getModules",
    "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{"internalType": "address", "name": "start", "type": "address"}, {
      "internalType": "uint256",
      "name": "pageSize",
      "type": "uint256"
    }],
    "name": "getModulesPaginated",
    "outputs": [{"internalType": "address[]", "name": "array", "type": "address[]"}, {
      "internalType": "address",
      "name": "next",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "getOwners",
    "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "getThreshold",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
    "name": "isOwner",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "nonce",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"internalType": "address", "name": "prevOwner", "type": "address"}, {
      "internalType": "address",
      "name": "owner",
      "type": "address"
    }, {"internalType": "uint256", "name": "_threshold", "type": "uint256"}],
    "name": "removeOwner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"internalType": "address", "name": "handler", "type": "address"}],
    "name": "setFallbackHandler",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
    "name": "signedMessages",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"internalType": "address", "name": "prevOwner", "type": "address"}, {
      "internalType": "address",
      "name": "oldOwner",
      "type": "address"
    }, {"internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "swapOwner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"internalType": "address[]", "name": "_owners", "type": "address[]"}, {
      "internalType": "uint256",
      "name": "_threshold",
      "type": "uint256"
    }, {"internalType": "address", "name": "to", "type": "address"}, {
      "internalType": "bytes",
      "name": "data",
      "type": "bytes"
    }, {"internalType": "address", "name": "fallbackHandler", "type": "address"}, {
      "internalType": "address",
      "name": "paymentToken",
      "type": "address"
    }, {"internalType": "uint256", "name": "payment", "type": "uint256"}, {
      "internalType": "address payable",
      "name": "paymentReceiver",
      "type": "address"
    }],
    "name": "setup",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"internalType": "address", "name": "to", "type": "address"}, {
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
    }, {"internalType": "bytes", "name": "data", "type": "bytes"}, {
      "internalType": "enum Enum.Operation",
      "name": "operation",
      "type": "uint8"
    }, {"internalType": "uint256", "name": "safeTxGas", "type": "uint256"}, {
      "internalType": "uint256",
      "name": "baseGas",
      "type": "uint256"
    }, {"internalType": "uint256", "name": "gasPrice", "type": "uint256"}, {
      "internalType": "address",
      "name": "gasToken",
      "type": "address"
    }, {"internalType": "address payable", "name": "refundReceiver", "type": "address"}, {
      "internalType": "bytes",
      "name": "signatures",
      "type": "bytes"
    }],
    "name": "execTransaction",
    "outputs": [{"internalType": "bool", "name": "success", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"internalType": "address", "name": "to", "type": "address"}, {
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
    }, {"internalType": "bytes", "name": "data", "type": "bytes"}, {
      "internalType": "enum Enum.Operation",
      "name": "operation",
      "type": "uint8"
    }],
    "name": "requiredTxGas",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"internalType": "bytes32", "name": "hashToApprove", "type": "bytes32"}],
    "name": "approveHash",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"internalType": "bytes", "name": "_data", "type": "bytes"}],
    "name": "signMessage",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"internalType": "bytes", "name": "_data", "type": "bytes"}, {
      "internalType": "bytes",
      "name": "_signature",
      "type": "bytes"
    }],
    "name": "isValidSignature",
    "outputs": [{"internalType": "bytes4", "name": "", "type": "bytes4"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{"internalType": "bytes", "name": "message", "type": "bytes"}],
    "name": "getMessageHash",
    "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{"internalType": "address", "name": "to", "type": "address"}, {
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
    }, {"internalType": "bytes", "name": "data", "type": "bytes"}, {
      "internalType": "enum Enum.Operation",
      "name": "operation",
      "type": "uint8"
    }, {"internalType": "uint256", "name": "safeTxGas", "type": "uint256"}, {
      "internalType": "uint256",
      "name": "baseGas",
      "type": "uint256"
    }, {"internalType": "uint256", "name": "gasPrice", "type": "uint256"}, {
      "internalType": "address",
      "name": "gasToken",
      "type": "address"
    }, {"internalType": "address", "name": "refundReceiver", "type": "address"}, {
      "internalType": "uint256",
      "name": "_nonce",
      "type": "uint256"
    }],
    "name": "encodeTransactionData",
    "outputs": [{"internalType": "bytes", "name": "", "type": "bytes"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{"internalType": "address", "name": "to", "type": "address"}, {
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
    }, {"internalType": "bytes", "name": "data", "type": "bytes"}, {
      "internalType": "enum Enum.Operation",
      "name": "operation",
      "type": "uint8"
    }, {"internalType": "uint256", "name": "safeTxGas", "type": "uint256"}, {
      "internalType": "uint256",
      "name": "baseGas",
      "type": "uint256"
    }, {"internalType": "uint256", "name": "gasPrice", "type": "uint256"}, {
      "internalType": "address",
      "name": "gasToken",
      "type": "address"
    }, {"internalType": "address", "name": "refundReceiver", "type": "address"}, {
      "internalType": "uint256",
      "name": "_nonce",
      "type": "uint256"
    }],
    "name": "getTransactionHash",
    "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
export const CIRCLES_HUB_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_inflation",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_period",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_symbol",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_signupBonus",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_initialIssuance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_timeout",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "HubTransfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "organization",
        "type": "address"
      }
    ],
    "name": "OrganizationSignup",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "Signup",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "canSendTo",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "limit",
        "type": "uint256"
      }
    ],
    "name": "Trust",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "deployedAt",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "divisor",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "inflation",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "initialIssuance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "limits",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "organizations",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "period",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "seen",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "signupBonus",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "timeout",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "tokenToUser",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "userToToken",
    "outputs": [
      {
        "internalType": "contract Token",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "validation",
    "outputs": [
      {
        "internalType": "bool",
        "name": "seen",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "sent",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "received",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "periods",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "issuance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_periods",
        "type": "uint256"
      }
    ],
    "name": "issuanceByStep",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_initial",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_periods",
        "type": "uint256"
      }
    ],
    "name": "inflate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "signup",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "organizationSignup",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "limit",
        "type": "uint256"
      }
    ],
    "name": "trust",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "base",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "exponent",
        "type": "uint256"
      }
    ],
    "name": "pow",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenOwner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "src",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "dest",
        "type": "address"
      }
    ],
    "name": "checkSendLimit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "tokenOwners",
        "type": "address[]"
      },
      {
        "internalType": "address[]",
        "name": "srcs",
        "type": "address[]"
      },
      {
        "internalType": "address[]",
        "name": "dests",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "wads",
        "type": "uint256[]"
      }
    ],
    "name": "transferThrough",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
