
const inputsDiv = document.getElementById("inputs");
const scenario = document.getElementById("scenario");
const stepsDiv = document.getElementById("steps");

function updateInputs() {
    const type = scenario.value;
    let html = "";

    if (type === "single") {
        html = `
            <label>Mass (kg):</label>
            <input type="number" id="mass" placeholder="Enter mass">
        `;
    } else if (type === "pulley") {
        html = `
            <label>Mass 1 (kg):</label>
            <input type="number" id="m1" placeholder="Enter mass 1">
            <label>Mass 2 (kg):</label>
            <input type="number" id="m2" placeholder="Enter mass 2">
        `;
    } else if (type === "incline") {
        html = `
            <label>Mass (kg):</label>
            <input type="number" id="m" placeholder="Enter mass">
            <label>Angle (degrees):</label>
            <input type="number" id="theta" placeholder="Enter angle">
            <label>Acceleration (m/s², optional):</label>
            <input type="number" id="a" placeholder="Enter acceleration (default 0)">
        `;
    } else if (type === "torque") {
        html = `
            <label>Force (N):</label>
            <input type="number" id="F" placeholder="Enter force">
            <label>Lever Arm Length (m):</label>
            <input type="number" id="r" placeholder="Enter distance from pivot">
            <label>Angle (degrees):</label>
            <input type="number" id="angle" placeholder="Enter angle between force and lever arm">
        `;
    }

    inputsDiv.innerHTML = html;
}

scenario.addEventListener("change", updateInputs);
updateInputs();

function calculate() {
    const g = 9.8;
    const type = scenario.value;
    let tension = 0, steps = "";

    if (type === "single") {
        const m = parseFloat(document.getElementById("mass").value);
        if (isNaN(m)) return showResult("Please enter mass.");

        tension = m * g;
        steps = `
            Formula: T = m × g<br>
            Substitution: T = ${m} × ${g}<br>
            Tension = <b>${tension.toFixed(2)} N</b>
        `;
    }

    else if (type === "pulley") {
        const m1 = parseFloat(document.getElementById("m1").value);
        const m2 = parseFloat(document.getElementById("m2").value);
        if (isNaN(m1) || isNaN(m2)) return showResult("Please enter both masses.");

        tension = (2 * m1 * m2 * g) / (m1 + m2);
        steps = `
            Formula: T = (2 × m₁ × m₂ × g) / (m₁ + m₂)<br>
            Substitution: T = (2 × ${m1} × ${m2} × ${g}) / (${m1} + ${m2})<br>
            Tension = <b>${tension.toFixed(2)} N</b>
        `;
    }

    else if (type === "incline") {
        const m = parseFloat(document.getElementById("m").value);
        const theta = parseFloat(document.getElementById("theta").value);
        const a = parseFloat(document.getElementById("a").value) || 0;
        if (isNaN(m) || isNaN(theta)) return showResult("Please enter mass and angle.");

        const rad = (theta * Math.PI) / 180;
        tension = m * (g * Math.sin(rad) + a);
        steps = `
            Formula: T = m(g·sinθ + a)<br>
            Substitution: T = ${m}(${g} × sin(${theta}) + ${a})<br>
            sin(${theta}) = ${Math.sin(rad).toFixed(3)}<br>
            Tension = <b>${tension.toFixed(2)} N</b>
        `;
    }

    else if (type === "torque") {
        const F = parseFloat(document.getElementById("F").value);
        const r = parseFloat(document.getElementById("r").value);
        const angle = parseFloat(document.getElementById("angle").value);
        if (isNaN(F) || isNaN(r) || isNaN(angle)) return showResult("Please enter all values.");

        const rad = (angle * Math.PI) / 180;
        const torque = F * r * Math.sin(rad);
        tension = torque;
        steps = `
            Formula: τ = F × r × sinθ<br>
            Substitution: τ = ${F} × ${r} × sin(${angle})<br>
            sin(${angle}) = ${Math.sin(rad).toFixed(3)}<br>
            Torque = <b>${torque.toFixed(2)} N·m</b>
        `;
    }

    showResult(`${type === "torque" ? "Torque" : "Tension"} = ${tension.toFixed(2)} ${type === "torque" ? "N·m" : "N"}`);
    stepsDiv.innerHTML = steps;
}

function showResult(msg) {
    document.getElementById("result").textContent = msg;
}