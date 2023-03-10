export class Grammar {
    production_rules_map: Map<string, string[]>;
    startSymbol: string;

    constructor(production_rules: Array<[string, string]>, startSymbol: string) {
        this.production_rules_map = Grammar.buildProductionRulesMap(production_rules);
        this.startSymbol = startSymbol;
    }

    // Builds a hash map from the right-hand side of a production rule to the
    // left-hand side of the production rule.
    private static buildProductionRulesMap(production_rules: Array<[string, string]>) {
        const map = new Map();
        for (const [lhs, rhs] of production_rules) {
            if (map.has(rhs)) {
                map.get(rhs).push(lhs);
            } else {
                map.set(rhs, [lhs]);
            }
        }
        return map;
    }

    // Returns a prettified string representation of the grammar.
    prettyString() {
        const production_rules = [];
        for (const [lhs, rhs] of this.production_rules_map) {
            production_rules.push(`${lhs} -> ${rhs}`);
        }
        return production_rules.join('\n');
    }

    // returns true if the given string is a valid production rule
    isValidProductionRule(production_rule: string) {
        return this.production_rules_map.has(production_rule);
    }
}