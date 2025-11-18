# ReactiveAggregatorV3Interface
Aggregator V3 with Reactive

## Project Details

This project aims to create a mirror/funnel for the aggregator V3 interface to send 
chainlink price feed data from supported chain to non supported chains using the Reactive 
network.

steps
1. subscribe to new round event
2. read round data/answer from source chain
3. send and store on destination chain