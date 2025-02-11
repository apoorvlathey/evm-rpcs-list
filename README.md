# evm-rpcs-list

List of EVM chains & their RPCs in one place. Sourced from chainlist.org.

## Installation

`yarn add evm-rpcs-list` or `npm i evm-rpcs-list`

## Usage

```
import networksList from "evm-rpcs-list";
```

## Project Setup

- Clone this repo with the submodules

```
git clone --recurse-submodules
```

- Install packages

```
pnpm i
```

- Install packages for the submodule

```
cd lib/chainlist
yarn
cd ../..
```

- Build the package (in /dist)

```
pnpm run buildAll
```
