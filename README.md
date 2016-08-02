# commandBuilder

Provides a DSL-like interface for creating binary commands (using Lego's protocol) to send over serial (USB or bluetooth) to an EV3 device.

## Usage
```

var soundCmdBytes = 
    commandBuilder
        .sound()
        .tone()
        .volume(50)
        .frequency(1000)
        .duration(1000)
        .toBuffer();
```