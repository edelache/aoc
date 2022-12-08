#include <stdio.h>
#include <string.h>


char toLower(char c) {
    if (c >= 65 && c <= 90) {
        return c + 32;
    }

    return c;
}

void cleanStr(char *str, int len, char *newStr) {
    int index = 0;
    int i;
    for (i = 0; i < len; i++) {
        if (str[i] >= 97 && str[i] <= 122) {
            newStr[index++] = str[i];
        }
    }
}

void reverseStr(char *str, int len, char *newStr) {
    int index = 0;
    int i, j;
    for (i = 0, j = len-1; i < len; i++, j--) {
        newStr[i] = str[j];
    }
}

void strToLower(char* str, int len) {
    int i;

    for (i = 0; i < len; i++) {
        str[i] = toLower(str[i]);
    }
}


int isPalindrome(char* str) {
    int len = strlen(str);
    char lower[512] = {0};
    char cleaned[512] = {0};
    char reversed[512] = {0};
    int i, j;

	strcpy(lower, str);
    strToLower(lower, len);
    cleanStr(lower, len, cleaned);

	len = strlen(cleaned);
    reverseStr(cleaned, len, reversed);

	printf("%s === %s\n", cleaned, reversed);
	if (strcmp(cleaned, reversed) == 0) {
		return 1;
	}

    return 0;
}









int runTest(char* name, char *str, int expected) {
    if (isPalindrome(str) == expected) {
        printf("[X] %s\n", str);
    } else {
        printf("[ ] %s\n", str);
    }
}


int main () {
    runTest("Should return true for 'mom'", "mom", 1);
    runTest("Should return true for 'Mom'", "Mom", 1);
    runTest("Should return true for 'race car'", "race car", 1);
    runTest("Should return false for 'jellyfish'", "jellyfish", 0);
    runTest("Really complicated string with punctuation", "Dennis, Nell, Edna, Leon, Nedra, Anita, Rolf, Nora, Alice, Carol, Leo, Jane, Reed, Dena, Dale, Basil, Rae, Penny, Lana, Dave, Denny, Lena, Ida, Bernadette, Ben, Ray, Lila, Nina, Jo, Ira, Mara, Sara, Mario, Jan, Ina, Lily, Arne, Bette, Dan, Reba, Diane, Lynn, Ed, Eva, Dana, Lynne, Pearl, Isabel, Ada, Ned, Dee, Rena, Joel, Lora, Cecil, Aaron, Flora, Tina, Arden, Noel, and Ellen sinned.", 1);

    return 0;
}
