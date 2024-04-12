class RootFinder {
    constructor(funcStr, a, b, maxIterations = 1000, tolerance = 1e-6) {
      this.func = this.parseFunction(funcStr);
      this.a = a;
      this.b = b;
      this.maxIterations = maxIterations;
      this.tolerance = tolerance;
    }

    parseFunction(funcStr) {
      const processedFuncStr = funcStr.replace(/([^A-Za-z0-9_])x([^A-Za-z0-9_])/g, '$1*(1)$2');
      return new Function('x', 'return ' + processedFuncStr);
    }

    findRoot() {
      let iteration = 0;
      let c = 0;

      while (iteration < this.maxIterations) {
        c = this.a * this.func(this.b) - this.b * this.func(this.a);
        c /= this.func(this.b) - this.func(this.a);

        const fa = this.func(this.a);
        const fb = this.func(this.b);
        const newRange = `[${this.a.toFixed(4)}, ${this.b.toFixed(4)}]`;
        const newFormula = `x = ${this.a.toFixed(4)}*f(${this.b.toFixed(4)}) - ${this.b.toFixed(4)}*f(${this.a.toFixed(4)}) / f(${this.b.toFixed(4)}) - f(${this.a.toFixed(4)})`;

        const iterationInfo = `
          Iteration ${iteration + 1}:<br>
          ${newFormula}<br>
          New Range: ${newRange}<br>
          f(a): ${fa.toFixed(4)}<br>
          f(b): ${fb.toFixed(4)}<br><br>
        `;
        document.getElementById('functionDisplay').innerHTML += iterationInfo;

        if (fa * this.func(c) < 0) {
          this.b = c;
        } else {
          this.a = c;
        }

        if (Math.abs(this.func(c)) < this.tolerance) {
          console.log(`Root found at x = ${c} after ${iteration + 1} iterations.`);
          return c; // Return the final root value
        }

        iteration++;
      }

      console.log(`Root not found within ${this.maxIterations} iterations.`);
      return null;
    }
  }

  function confirmFunction() {
    document.getElementById('functionDisplay').innerHTML = ''; // Clear previous content
    const functionInput = document.getElementById('functionInput').value;
    const lowerBound = parseFloat(document.getElementById('lowerBound').value);
    const upperBound = parseFloat(document.getElementById('upperBound').value);

    const displayFunction = `Function f(x): ${functionInput}<br>`;
    document.getElementById('functionDisplay').innerHTML = displayFunction;

    const finder = new RootFinder(functionInput, lowerBound, upperBound);
    const finalRoot = finder.findRoot();
    if (finalRoot !== null) {
      document.getElementById('functionDisplay').innerHTML += `Final Root: ${finalRoot.toFixed(6)}`;
    } else {
      document.getElementById('functionDisplay').innerHTML += `Root not found within ${finder.maxIterations} iterations.`;
    }
  }