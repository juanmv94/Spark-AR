#include <sstream>
#include <string>
#include <stdlib.h>
#include <iostream>
#define PNGW 280
#define PNGH 416
#define SPRITEW 10
#define SPRITEH 10

using namespace std; 
  
int main() 
{ 
    stringstream cmd;
	cmd<<"ffmpeg -f lavfi -i color=c=black:s="<<(PNGW*SPRITEW)<<"x"<<(PNGH*SPRITEH);
	for (int i=1;i<=(SPRITEW*SPRITEH);i++) cmd<<" -i \"v ("<<i<<").png\"";
	cmd<<" -filter_complex ";
	for (int i=1;i<=(SPRITEW*SPRITEH);i++) {
		cmd<<"["<<((i==1) ? "0" : "a")<<"]["<<i<<"]overlay=shortest=1:x="<<(((i-1)%SPRITEW)*PNGW)<<":y="<<(((i-1)/SPRITEW)*PNGH);
		if (i<(SPRITEW*SPRITEH)) cmd<<"[a]"<<",";
	}
	cmd<<" out.png";
	cout << cmd.str()<<"\n\n";
	system(cmd.str().c_str());
    return 0; 
} 