"use client";

import { useState } from 'react';

const perguntas = [
  "과거에 저지른 작거나 의도하지 않은 실수라도 나 자신을 용서하는 데 어려움이 있습니다.",
  "명백히 내 책임이 아닌 상황이나 사건에서도 자주 죄책감을 느낍니다.",
  "주변 사람들의 불행이나 고통이 나 때문이라고 자주 생각합니다.",
  "죄책감 때문에 다른 사람이 나를 칭찬하거나 나 자신의 장점을 인정하는 것이 어렵습니다.",
  "과거의 실수를 반복적으로 떠올리며 자주 수치심이나 후회를 느낍니다.",
  "최근에 행복을 누릴 자격이 없거나 내가 한 일에 대해 심하게 벌을 받아야 한다고 생각한 적이 있습니다.", // FLAG
  "과거 상황에서 더 잘했어야 한다는 생각에 자주 괴롭거나 슬픔을 느낍니다.",
  "잦은 죄책감과 자기 비난으로 인해 감정적 삶과 자존감이 깊은 영향을 받습니다.",
  "실수할까봐 결정을 내리는 것이 어렵고 이후 죄책감을 느낄까 두렵습니다.",
  "과거의 실수로 인해 다른 사람들과의 접촉이나 특정 상황을 부끄럽거나 두려워서 피합니다."
];

export default function TesteCulpa() {
  const [respostas, setRespostas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const registrarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[indiceAtual] = valor;
    setRespostas(novasRespostas);

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado(novasRespostas);
    }
  };

  const calcularResultado = (respostas) => {
    if (respostas[5] >= 3) { // FLAG
      setResultado("적색");
    } else {
      const soma = respostas.reduce((a, b) => a + b, 0);
      if (soma <= 20) setResultado("녹색");
      else if (soma <= 35) setResultado("황색");
      else setResultado("적색");
    }
  };

  const reiniciarTeste = () => {
    setRespostas(Array(10).fill(0));
    setResultado(null);
    setIndiceAtual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">죄책감 테스트</h2>
          <div className="mb-6 text-sm text-gray-700 dark:text-gray-300 text-center">
            <p className="mb-4">
              다음 상황이 현재 당신에게 얼마나 자주 발생하는지를 선택해 주세요:<br />
              <strong>(1) 전혀 아님 | (2) 드묾 | (3) 가끔 | (4) 자주 | (5) 항상</strong>
            </p>
          </div>

          <p className="mb-4">{perguntas[indiceAtual]}</p>

          <div className="flex justify-between items-end mb-4">
            {[1, 2, 3, 4, 5].map((num) => {
              const corGradiente = {
                1: "from-gray-300 to-gray-400",
                2: "from-blue-200 to-blue-300",
                3: "from-blue-300 to-blue-400",
                4: "from-blue-500 to-blue-600",
                5: "from-blue-700 to-blue-800",
              };

              return (
                <button
                  key={num}
                  onClick={() => registrarResposta(num)}
                  className={`flex items-center justify-center rounded-full text-white font-bold hover:scale-110 transition transform bg-gradient-to-br ${corGradiente[num]}`}
                  style={{
                    width: `${30 + num * 5}px`,
                    height: `${30 + num * 5}px`,
                    fontSize: `${12 + num}px`
                  }}
                >
                  {num}
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-sm">질문 {indiceAtual + 1} / {perguntas.length}</p>
        </>
      ) : (
        <>
          
          <h2 className="text-xl font-semibold mb-4 text-center">결과: {resultado}</h2>
          <img
            src={
              resultado === "녹색"
                ? "/images/semaforo-verde.png"
                : resultado === "황색"
                ? "/images/semaforo-amarelo.png"
                : "/images/semaforo-vermelho.png"
            }
            alt={`신호등 표시: ${resultado}`}
            className="w-40 h-auto mx-auto mb-4"
          />
          {resultado === "녹색" && (
            <p className="text-center">이 주제에 매우 잘 대처하고 있으며 정서적으로 안정된 상태입니다. 다른 사람들을 도울 수 있는 능력이 있습니다.</p>
          )}
          {resultado === "황색" && (
            <p className="text-center">해결이 필요한 정서적 어려움의 분명한 신호가 있습니다. 의지와 도움을 통해 극복할 수 있습니다.</p>
          )}
          {resultado === "적색" && (
            <p className="text-center">이 주제와 관련된 정서적 문제가 전문적인 도움이 필요합니다. 가능한 빨리 의사나 심리 전문가를 찾으십시오.</p>
          )}
          <button
            className="mt-6 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700 block mx-auto"
            onClick={reiniciarTeste}
          >
            테스트 다시 하기
          </button>
    
        </>
      )}
    </div>
  );
}
