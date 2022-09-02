import Component from "@core/Component";
import { canvas } from "@core/CreateDom";
import categories from "@store/categories";

const SPACE_COLOR = "white";
const EMPTY_GRAPH_COLOR = "#F5F5F5";

export default class DoughnutChart extends Component {
    afterRender() {
        this.init();
        this.calculateCumulativeRadian();
        this.animate();
    }

    init() {
        this.canvas = this.element;
        this.canvas.size = 255;
        this.canvas.style.width = `${this.canvas.size}px`;
        this.canvas.style.height = `${this.canvas.size}px`;
        this.canvas.width = this.canvas.size * 2;
        this.canvas.height = this.canvas.size * 2;
        this.ctx = this.canvas.getContext("2d");

        this.reconciliationValue = 0.005;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.radius = this.canvas.width / 2;
        this.maxRadian = Math.PI * 2;

        this.frame = 1;
        this.totalFrame = 60;

        this.currentRadian = 0;
        this.updatedRadian = 0;
        this.cumulativeIndex = 0;
    }

    calculateCumulativeRadian() {
        const { historySumList, totalExpenditure } = this.props;

        if (totalExpenditure <= 0) {
            this.cumulativeRadianList = [{ categoryId: null, cumulativeRadian: this.maxRadian }];
            return;
        }

        let prevRadian = 0;

        const cumulativeRadianMap = historySumList.map(([categoryId, subTotal]) => {
            const cumulativeRadian = (subTotal / totalExpenditure) * this.maxRadian + prevRadian;
            prevRadian = cumulativeRadian;
            return { categoryId, cumulativeRadian };
        });

        this.cumulativeRadianList = cumulativeRadianMap;
    }

    calculateNextRadian() {
        function easeInOutQuint(x) {
            return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
        }
        const delta = this.frame / this.totalFrame;
        return easeInOutQuint(delta) * this.maxRadian;
    }
    animate() {
        if (this.currentRadian >= this.maxRadian - this.reconciliationValue) {
            this.cumulativeIndex = 0;
            return;
        }

        // const updatedRadian = this.currentRadian + delta;
        const updatedRadian = this.calculateNextRadian();
        this.updatedRadian = Math.min(this.maxRadian, updatedRadian);
        this.color = this.getCurrentColor();

        this.draw();

        this.currentRadian = this.updatedRadian;

        requestAnimationFrame(() => {
            this.frame++;
            this.animate();
        });
    }

    getCurrentColor() {
        const { categoryId, cumulativeRadian } = this.cumulativeRadianList[this.cumulativeIndex];
        if (!categoryId) {
            return EMPTY_GRAPH_COLOR;
        }

        if (this.currentRadian > cumulativeRadian) {
            this.cumulativeIndex += 1;
            const { categoryId } = this.cumulativeRadianList[this.cumulativeIndex];

            return categories.getCategoryColorById(categoryId);
        } else {
            return categories.getCategoryColorById(categoryId);
        }
    }

    draw() {
        this.cumulativeRadianList.forEach(() => {});

        let updatedRadian = this.updatedRadian;

        while (this.cumulativeIndex < this.cumulativeRadianList.length) {
            const { cumulativeRadian } = this.cumulativeRadianList[this.cumulativeIndex];
            const color = this.getCurrentColor();
            if (updatedRadian <= cumulativeRadian) {
                this.drawPieSlice(
                    this.radius,
                    this.currentRadian - this.reconciliationValue,
                    this.updatedRadian,
                    color,
                );
                break;
            }

            if (updatedRadian > cumulativeRadian) {
                this.drawPieSlice(
                    this.radius,
                    this.currentRadian - this.reconciliationValue,
                    cumulativeRadian,
                    color,
                );
                this.cumulativeIndex++;
                this.currentRadian = cumulativeRadian;
            }
        }

        this.drawPieSlice(this.radius / 2, 0, this.maxRadian, SPACE_COLOR);
    }

    bindState() {
        return [categories.state];
    }

    drawPieSlice(radius, startAngle, endAngle, color) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.arc(
            this.centerX,
            this.centerY,
            radius,
            startAngle - Math.PI / 2,
            endAngle - Math.PI / 2,
        );
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    render() {
        return canvas({ id: "doughnutChart" })();
    }
}
