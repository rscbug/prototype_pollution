# prototype_pollution

# card vulnerability
ID-CVE : CVE-2023-45827
CVSS 3.1 : 9,8
ID-CWE : CWE-1321
Type : Prototype Pollution
Impact: Depends on the subsequent use of object properties to implement critically dangerous functions (distribution of rights, code execution, business logic)
Description package: TypeScript library @clickbar/dot-diver up to version 1.0.1 inclusive, which provides a convenient API for reading a field value from an object (getByPath function) and writing a value to an object field (setByPath function)

#run the command for a semgrep rule:

```sh
$semgrep scan --config ./rules/prototype_pollution_taint.yaml
```