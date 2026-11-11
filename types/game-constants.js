var NumberLengthRange;
(function (NumberLengthRange) {
    NumberLengthRange[NumberLengthRange["MIN_LENGTH"] = 2] = "MIN_LENGTH";
    NumberLengthRange[NumberLengthRange["MAX_LENGTH"] = 6] = "MAX_LENGTH";
})(NumberLengthRange || (NumberLengthRange = {}));
var NumeralSystems;
(function (NumeralSystems) {
    NumeralSystems[NumeralSystems["BIN"] = 2] = "BIN";
    NumeralSystems[NumeralSystems["OCT"] = 8] = "OCT";
    NumeralSystems[NumeralSystems["DEC"] = 10] = "DEC";
    NumeralSystems[NumeralSystems["HEX"] = 16] = "HEX";
})(NumeralSystems || (NumeralSystems = {}));
export { NumberLengthRange, NumeralSystems };
