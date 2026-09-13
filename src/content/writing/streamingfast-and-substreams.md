---
title: "StreamingFast and Substreams"
description: "An introduction to Substreams and Firehose — how StreamingFast sped up indexing on The Graph without giving up verifiability."
oldPath: "/hosted-blog-pages/streamingfast-and-substreams"
order: 3
---
Web3 is an exciting and rapidly-evolving space, and one of the most important pieces of the puzzle is The Graph. This platform allows developers to efficiently access and query data from decentralized applications across various blockchains. One of the latest developments within The Graph ecosystem is Substreams.

## StreamingFast

Indexing tasks could take weeks to sync but now with Substreams from StreamingFast, a powerful parallelizable engine to process blockchain data, these same tasks can be completed in a matter of hours. StreamingFast, formerly dfuse, joined The Graph as a core developer in June 2021. Their first major contribution was the Firehose which greatly improved the extraction component of The Graph indexing engine. Substreams speed up indexing by improving the Transform layer.

## Extract, Transform, Load, Query

This is The Graph's model. With Firehose and Substreams the Extract and Transform layers respectively have been massively improved.

If you want data from an Ethereum network you need to index. Want security and verifiability? Read block by block linearly using API calls on Ethereum nodes. StreamingFast solved these problems with Firehose-powered Substreams. Using a streaming-first approach and the flat files structure from Firehose we have rich protobuf models, stream cursors, and the ability to use parallelization without sacrificing verifiability. You could rebuild the entire node from the flat files. Everything is cacheable and hashable. Instead of using the traditional handlers in AssemblyScript, developers can use Rust to write Substreams modules. These can run in parallel boosting performance.

## How do they work?

Substreams take the data provided and a query and break it down into small parallelizable chunks.

Get up to 100x speed improvements with Firehose and Substreams on Ethereum clients. On March 16 StreamingFast announced that Substreams reached general availability. On April 27 at Core Dev Call 20 they showed off the new UI tool.
