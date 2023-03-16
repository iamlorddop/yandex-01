interface Block {
    id: number;
    form: number[][];
}

interface LayoutResult {
    blockId: number;
    position: number;
    isRotated: boolean;
}

const blocks = [{
    "id": 1,
    "form": [
        [1, 0, 1],
        [1, 1, 1],
        [1, 1, 1]
    ]
},
    {
        "id": 2,
        "form": [
            [0, 0, 1],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ]
    },
    {
        "id": 3,
        "form": [
            [0, 1, 1],
            [1, 1, 1],
            [0, 1, 0]
        ]
    }];

const sidebar = [];

// проверка формы блока на isRotated
function isRotatedCheck(matrix: number[][], cellRow: any, cellCol: any) {
    // проверяем все строки и столбцы
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if ( matrix[row][col] && (
                // не пуст
                cellCol + col < 0 ||
                // не превышает ширину сетки
                cellCol + col >= matrix[0].length
                ||
                // пересечение с другим блоком
                sidebar[cellRow + row][cellCol + col]
                )
            ) {

                // isRotated false
                return false;
            }
        }
    }
    // isRotated true
    return true;
}

function layout(blocks: Block[]): LayoutResult[]  {
    const result: LayoutResult[] = [];

    // обходим созданные объекты
    for(let i = 0; i < blocks.length; i++) {

        const rotate = isRotatedCheck(blocks[i].form, blocks[i].form[i], blocks[i].form[i][i]);

        result[i] = {
            blockId: blocks[i].id,
            position: (i + 1),
            // берем значение из rotate
            isRotated: rotate,
        }
    }

    return result;
}

console.log(layout(blocks));

module.exports = layout(blocks);