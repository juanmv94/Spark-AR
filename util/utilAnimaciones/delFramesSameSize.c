#include <stdio.h>
 
long fsize(char* name)
{
	//puts(name);
	FILE *fp=fopen(name, "rb");
	if (fp == NULL)
    {
        return(0);
    }
	fseek(fp, 0, SEEK_END);
	long off = ftell(fp);
	fclose(fp);
	return off;
}
 
int main()
{
  char file_name[32];
  int i=1;
  long lasts=0;
  while(1) {
	  sprintf(file_name,"s (%d).png",i++);
	  long s=fsize(file_name);
	  if (s==0) break;
	  if (s==lasts) remove(file_name);
	  lasts=s;
  }
  return 0;
}