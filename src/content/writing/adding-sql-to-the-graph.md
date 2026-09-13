---
title: "Adding SQL to The Graph"
description: "Notes from Core Dev Call 26: SQL is coming to The Graph via StreamingFast, DBT, ClickHouse, and deployable units."
oldPath: "/hosted-blog-pages/adding-sql-to-the-graph"
order: 2
---
Anyone who has been developing on The Graph knows that we use GraphQL for queries. The Guild maintains an excellent GraphQL library and there are many benefits. During Core Dev Call 26 StreamingFast announced that SQL is coming to The Graph via an upgrade to their data processing suite that already includes superstars like the Firehose and Substreams. During the call they gave a demo of what it would look like to run these new features on your own setup which is exciting as it continues our work towards a truly decentralized future. StreamingFast encouraged devs to contact them on their Discord to get help setting up the beta and also to share any specific needs so that they can add features that the community needs.

The call covered other topics as well but in this post I want to focus on SQL. StreamingFast separated their presentation into three parts:

- 11:30 — Bringing SQL Queries to The Graph | Semiotic Labs
- 22:20 — How DBT (Data Build Tool) Takes SQL to the Next Level
- 30:30 — The Backend: Infrastructure for SQL and DBT Integration | feat. StreamingFast

StreamingFast and others would like to expand the capability of The Graph to cover not only the needs of developers making dapps but also the data science community. GraphQL is great for dapp developers because they don't need to maintain an API backend and because dapps often use fixed queries which can be well defined in advance. SQL offers speed and flexibility as well as brand new applications for the decentralized data marketplace we are building.

[Data Build Tool (DBT)](https://www.getdbt.com/) has emerged as a popular solution to fill a tooling gap for SQL. The team has chosen ClickHouse as a choice of SQL integration for their products but know that it is possible and desirable to include other tools in the future.

## Timeline

- Define the SQL API (Prototype Done)
- Integrate DBTs into Substreams (Work In Progress)
- Test Deployment with Pinax and StreamingFast (Q4 2023)
- Integrate with Gateway & Billing (Q1 2024)

The proposed solution is something they are calling "deployable units": Firehose and Substreams perform the data extraction and initial processing, then SQL sync is used to transfer data into databases like Postgres or ClickHouse. DBT is involved in data transformation as an alternative to Substreams for data manipulation. This setup allows direct querying of the data via GraphQL, REST API, or direct SQL access.

StreamingFast gave a live demo. Key features include database output designed to feed into an SQL database, and the ability to package and share the entire schema as an .spkg file. One example used Postgres to process Bored Ape data while the other used ClickHouse to show CryptoPunks.

Ping me on Twitter or Discord if you have any feedback: @athsrueas
