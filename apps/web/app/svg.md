### Absolute and Relative Commands:
- uppercase are Absolute: meaning their parameters are related to the origin point(0,0).
- lowercase are relative: meaning their parameters are relative to the previous command's endpoint.

#### Example:
- `M 10 10 L 20 20` (absolute move command)
- `m 10 10 l 20 20` (relative move command)

- `L 30 30` (absolute)
- `l 30 30` (relative)
- `H 40` (absolute horizontal line)
- `h 5` (relative horizontal line)
- `V 50` (absolute vertical line)
- `v 5` (relative vertical line)

- `Q 10 10 20 20` (absolute quadratic curve)
- `q 10 10 20 20` (relative quadratic curve)
- `T & t` (to chain two quadratic curves)

- `C 10 10 20 20 30 30` (absolute cubic curve)
- `c 10 10 20 20 30 30` (relative cubic curve)
- `S & s` (to chain two cubic curves)