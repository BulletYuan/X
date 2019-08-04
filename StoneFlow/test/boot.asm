    org 0100h
    mov ax,cs
    mov ds,ax
    mov es,ax
    call DispStr
    jmp $
DispStr:
    mov ax,BootMsg
    mov bp,ax
    mov cx,16
    mov ax,01301h
    mov bx,000ch
    mov dl,0
    int 10h
    ret
BootMsg:    db "Hello World!"
times 510-($-$$) db 0
dw 0xaa55