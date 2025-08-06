import java.util.*;

class Solution {
    public int solution(int n, int w, int num) {
        // 총 층 수 계산
        // n개의 상자를 가로로 w개씩 쌓으므로 n/w 층 이상 필요
        // 정확히 나누어떨어지지 않으면 +1층 더 필요하므로 h = n / w + 1
        int h = n / w + 1;

        // 창고 상자 배열 선언 (층 h, 열 w)
        int[][] boxes = new int[h][w];

        int number = 0; // 상자 번호 (1번부터 시작)

        // 지그재그 방식으로 상자 채우기
        for (int i = 0; i < h; i++) {
            if (i % 2 == 1) {
                // 홀수 층: 오른쪽 -> 왼쪽
                for (int j = w - 1; j >= 0; j--) {
                    boxes[i][j] = ++number; // 상자 번호 증가 후 저장
                    if (number == n)
                    break; // 마지막 상자까지 채우면 중단
                }
            } else {
                // 짝수 층: 왼쪽 -> 오른쪽
                for (int j = 0; j < w; j++) {
                    boxes[i][j] = ++number;
                    if (number == n)
                    break;
                }
            }
            if (number == n)
            break; // 모든 상자를 다 채웠으면 바깥 for문도 중단
        }

        int count = 0;  // 꺼내야 할 상자의 개수
        int col = -1;   // 찾고자 하는 상자(num)의 열(인덱스)를 저장

        // 상자 찾기 및 해당 열 위로 쌓인 상자 세기
        for (int i = 0; i < h; i++) {
            for (int j = 0; j < w; j++) {
                // 찾고자 하는 상자 번호를 발견한 경우
                if (boxes[i][j] == num) col = j;

                // col이 설정된 이후, 그 열에 상자가 있다면 개수 증가
                // (해당 열은 목표 상자가 있는 열이며, 위층부터 아래층까지 모두 확인함)
                if (j == col && boxes[i][j] != 0) count++;
            }
        }

        return count; // 최종 꺼내야 할 상자 수 반환
    }
}
