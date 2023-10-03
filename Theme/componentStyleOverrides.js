const componentStyleOverrides = theme => {
  return {
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          shrink: true
        },
        size: 'small',
        margin: 'dense'
      },
      styleOverrides: {
        root: {
          height: '35px'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: '35px'
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          padding: '5px',
          marginBottom: '3px',
          borderRadius: '5px',
          '&.Mui-selected': {
            backgroundColor: theme.palette.themeHover
          },
          '&:hover': {
            backgroundColor: theme.palette.themeHover
          }
        }
      }
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '36px'
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {}
    },
    MuiSwitch: {
      defaultProps: {
        color: 'buttons'
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: theme.palette.secondary.main
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: '10px'
        },
        root: {
          height: '35px'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          background: theme.palette.primary.main,
          padding: '2px 10px',
          height: '20px',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          color: '#ffffff'
        },
        root: {
          textAlign: 'center',
          padding: '2px 10px',
          height: 20,
          overflowWrap: 'break-word',
          border: theme.palette.border
        },
        body: {
          verticalAlign: 'middle'
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: theme.palette.primary.main,
          zIndex: 100000,
          top: 0,
          position: 'sticky'
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          height: 20,
          '&:nth-of-type(even)': {
            backgroundColor: theme.palette.hover
          }
        },
        head: {
          height: 'auto',
          borderRadius: 5
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: '50px',
          '&.Mui-selected': {
            backgroundColor: theme.palette.themeHover,
            color: theme.palette.secondary.main
          }
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: 'transparent'
        },
        flexContainer: {
          flexWrap: 'wrap'
        }
      }
    },
    MuiOutlinedInput: {
      defaultProps: {
        color: 'secondary'
      },
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            boxShadow: `0 0 0 100px ${
              theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.hover
            } inset`
          }
        }
      }
    },
    MuiTreeItem: {
      styleOverrides: {
        content: {
          minWidth: 'max-content',
          color: theme.palette.secondary.main,
          padding: 1,
          marginTop: 1,
          borderRadius: 5,
          '&.Mui-selected': {
            backgroundColor: theme.palette.themeHover
          },
          '&:hover': {
            backgroundColor: theme.palette.themeHover
          }
        },
        iconContainer: {
          width: '40px',
          alignItems: 'center',
          '& svg': {
            fontSize: '25px'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '13px'
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '20px'
        }
      }
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          boxShadow: theme.palette.shadow.secondary
        },
        row: {
          maxHeight: 'none !important',
          '&:nth-of-type(2n)': {
            backgroundColor: theme.palette.hover
          },
          '&.Mui-selected': {
            backgroundColor: theme.palette.themeHover,
            fontWeight: 'bold'
          }
        },
        cell: {
          maxHeight: 'none !important'
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          lineHeight: 1,
          marginTop: 1
        }
      }
    },
    MuiMenuItem: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'red'
          }
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'transparent',
          boxShadow: 'none',
          overflow: 'hidden'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        filled: {
          height: '20px'
        },
        deleteIcon: {
          width: '18px'
        }
      }
    }
  };
};
export default componentStyleOverrides;
