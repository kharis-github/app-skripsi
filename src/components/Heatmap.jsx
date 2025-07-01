import React, { useRef, useEffect } from "react";
import {
    Chart,
    registerables
} from "chart.js";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";

// Register Chart.js komponen
Chart.register(...registerables, MatrixController, MatrixElement); // register chart agar dapat digunakan sebagai komponen

const Heatmap = (props) => {
    const { values } = props // ambil data yang akan ditampilkan
    const tn = values[0][0]
    const fp = values[0][1]
    const fn = values[1][0]
    const tp = values[1][1]
    const canvasRef = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");

        const chartInstance = new Chart(ctx, {
            type: "matrix",
            data: {
                datasets: [{
                    label: '2x2 Heatmap',
                    data: [
                        { x: 0, y: 0, v: tn },
                        { x: 1, y: 0, v: fp },
                        { x: 0, y: 1, v: fn },
                        { x: 1, y: 1, v: tp },
                    ],
                    backgroundColor(ctx) {
                        const value = ctx.dataset.data[ctx.dataIndex].v;
                        const alpha = value / 2; // Normalisasi ke 0–1
                        return `rgba(0, 0, 255, ${alpha})`;
                    },
                    width: ({ chart }) => (chart.chartArea || {}).width / 2 - 1,
                    height: ({ chart }) => (chart.chartArea || {}).height / 2 - 1,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: ctx => `Value: ${ctx.raw.v}`
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        min: -0.5,
                        max: 1.5,
                        ticks: { stepSize: 1 }
                    },
                    y: {
                        type: 'linear',
                        min: -0.5,
                        max: 1.5,
                        reverse: true,
                        ticks: { stepSize: 1 }
                    }
                }
            }
        });

        return () => {
            chartInstance.destroy();
        };
    }, []);

    return (
        <div>
            <h3>Confusion Matrix</h3>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default Heatmap;
