export const casesColors = {
    cases: {
        hex: "#0000ff",
        rgb: "rgba(0, 0, 255)",
        half_op: "rgba(0, 0, 255, 0.5)",
        multiplier: 800,
    },
    recovered: {
        hex: "#00ff00",
        rgb: "rgb(0, 255, 0)",
        half_op: "rgba(0, 255, 0, 0.5)",
        multiplier: 1200,
    },
    deaths: {
        hex: "#ff0000",
        rgb: "rgb(255, 0, 0)",
        half_op: "rgba(255, 0, 0, 0.5)",
        multiplier: 2000,
    }
};

export const dataSort = data => {
    let sortedData = [...data];
    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    });
    return sortedData;
};