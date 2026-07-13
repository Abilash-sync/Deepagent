# ABI (Application Binary Interface)

## Overview
An Application Binary Interface (ABI) is a low-level interface between two program modules, typically between an operating system and user programs, or between libraries and applications.

## Key Components

### 1. Data Type Representation
- Size and alignment of basic data types
- Structure padding and alignment
- Endianness conventions

### 2. Calling Conventions
- How parameters are passed (registers vs. stack)
- Return value handling
- Stack frame layout
- Register preservation rules

### 3. System Call Interface
- How applications invoke operating system services
- System call numbers and conventions
- Error handling mechanisms

### 4. Object File Format
- Structure of compiled binaries
- Symbol tables and linking conventions
- Dynamic linking mechanisms

## Common ABIs

### x86-64 System V ABI
Used by most Unix-like systems including Linux, BSD, and macOS.

### Windows x64 ABI
Microsoft's calling convention for 64-bit Windows.

### ARM EABI
Embedded Application Binary Interface for ARM processors.

## Importance

- **Binary Compatibility**: Ensures compiled code can work across different versions
- **Language Interoperability**: Enables code written in different languages to interact
- **Library Linking**: Allows dynamic and static library linking
- **System Portability**: Facilitates code portability across similar systems

## Related Concepts

- API (Application Programming Interface) - source code level interface
- ISA (Instruction Set Architecture) - hardware instruction interface
- Calling conventions
- Name mangling
- Symbol versioning
