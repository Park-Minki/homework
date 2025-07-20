package prlotto;

public class lotto {
	
	class Solution {
	    public int[] solution(int[] lottos, int[] win_nums) {
	        // 0의 개수 (알 수 없는 번호 개수)
	        int zeroCount = 0;
	        // 당첨 번호와 일치하는 숫자 개수
	        int matchCount = 0;

	        for (int num : lottos) {
	            if (num == 0) {
	                zeroCount++;
	                continue;
	            }
	            // win_nums 배열에 현재 num이 존재하면 matchCount 증가
	            for (int win : win_nums) {
	                if (num == win) {
	                    matchCount++;
	                    break;
	                }
	            }
	        }

	        // 최고 순위는 일치 + 0의 개수, 최저 순위는 일치만
	        int maxMatch = matchCount + zeroCount;
	        int minMatch = matchCount;

	        // 등수는 6개 - 맞은 개수 + 1 (단, 2개 이하면 6등)
	        int maxRank = getRank(maxMatch);
	        int minRank = getRank(minMatch);

	        return new int[]{maxRank, minRank};
	    }

	    // 맞춘 개수로 순위 반환
	    private int getRank(int count) {
	        return count >= 2 ? 7 - count : 6;
	    }
	}

}
