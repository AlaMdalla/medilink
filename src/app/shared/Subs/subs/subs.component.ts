import { Component } from '@angular/core';
import { Subs } from 'src/app/models/subs.model';
import { SubsService } from 'src/app/Services/subs.service';
@Component({
  selector: 'app-subs',
  templateUrl: './subs.component.html',
  styleUrls: ['./subs.component.css']
})
export class SubsComponent {
    
    
        subscriptions: Subs[] = [];
        filteredSubscriptions: Subs[] = [];
        displayedSubscriptions: Subs[] = [];
        searchTerm: string = '';
    
        constructor(private subsService: SubsService) {}
    
        ngOnInit(): void {
            this.getSubscriptions();
        }
    
        getSubscriptions(): void {
            this.subsService.getAllSubscriptions().subscribe(
                (data: Subs[]) => {
                    this.subscriptions = data;
                    this.filteredSubscriptions = [...this.subscriptions];
                    this.displayedSubscriptions = [...this.filteredSubscriptions];
                },
                (error) => {
                    console.error('Error fetching subscriptions', error);
                }
            );
        }
    
        filterSubscriptions(): void {
            if (!this.searchTerm.trim()) {
                this.filteredSubscriptions = [...this.subscriptions];
            } else {
                const term = this.searchTerm.toLowerCase();
                this.filteredSubscriptions = this.subscriptions.filter(sub =>
                    sub.typesub.toLowerCase().includes(term)
                );
            }
            this.displayedSubscriptions = [...this.filteredSubscriptions];
        }
    }

